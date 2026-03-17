import Array "mo:core/Array";
import Blob "mo:core/Blob";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Storage "blob-storage/Storage";
import Iter "mo:core/Iter";
import Time "mo:core/Time";

import Text "mo:core/Text";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";


actor {
  // EXTENSIONS
  include MixinStorage();
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // TYPES

  public type Board = {
    #CBSE;
    #IGCSE;
  };

  public type Review = {
    studentName : Text;
    reviewText : Text;
    starRating : Nat;
    year : Nat;
  };

  public type Achievement = {
    studentName : Text;
    board : Board;
    grade : Nat;
    score : Nat;
    year : Nat;
  };

  public type FileType = {
    #pdf;
    #image;
    #video;
    #doc;
  };

  public type Resource = {
    title : Text;
    description : Text;
    blob : Storage.ExternalBlob;
    fileType : FileType;
    uploadedAt : Int;
  };

  public type UserProfile = {
    name : Text;
  };

  // DATA

  var achievements : [Achievement] = [
    { studentName = "Aditya"; board = #CBSE; grade = 10; score = 99; year = 2021 },
    { studentName = "Sanjana"; board = #CBSE; grade = 10; score = 99; year = 2022 },
    { studentName = "Shishir"; board = #IGCSE; grade = 10; score = 0; year = 2022 },
    { studentName = "Aayush"; board = #CBSE; grade = 10; score = 100; year = 2024 },
    { studentName = "Aarin"; board = #CBSE; grade = 10; score = 100; year = 2024 },
    { studentName = "Neev"; board = #CBSE; grade = 10; score = 100; year = 2024 },
    { studentName = "Rishi"; board = #CBSE; grade = 10; score = 99; year = 2025 },
  ];

  var reviewsData : [Review] = [];

  var resources : Map.Map<Nat, Resource> = Map.empty<Nat, Resource>();

  var userProfiles : Map.Map<Principal, UserProfile> = Map.empty<Principal, UserProfile>();

  // User Profiles

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized");
    };
    userProfiles.add(caller, profile);
  };

  // Reviews

  public shared ({ caller }) func addReview(review : Review) : async () {
    if (review.starRating < 1 or review.starRating > 5) {
      Runtime.trap("Star rating must be between 1 and 5");
    };
    if (review.studentName.size() == 0) {
      Runtime.trap("Student name cannot be empty");
    };
    if (review.reviewText.size() == 0) {
      Runtime.trap("Review text cannot be empty");
    };
    reviewsData := reviewsData.concat([review]);
  };

  public query ({ caller }) func getReviews() : async [Review] {
    reviewsData;
  };

  // Achievements

  public query ({ caller }) func getAchievements() : async [Achievement] {
    achievements;
  };

  // Resources

  public shared ({ caller }) func uploadResource(title : Text, description : Text, blob : Storage.ExternalBlob, fileType : FileType) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admin can upload resources");
    };
    if (title.size() == 0) {
      Runtime.trap("Title cannot be empty");
    };
    var currentId = 0;
    if (resources.size() > 0) {
      let keys = resources.keys().toArray();
      let maxValue = keys.foldLeft(0, Nat.max);
      currentId := maxValue + 1;
    };
    let resource : Resource = {
      title;
      description;
      blob;
      fileType;
      uploadedAt = Time.now();
    };
    resources.add(currentId, resource);
  };

  public query ({ caller }) func getResources() : async [Resource] {
    resources.values().toArray();
  };

  public query ({ caller }) func getResourceById(id : Nat) : async ?Resource {
    resources.get(id);
  };

  public shared ({ caller }) func deleteResource(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admin can delete resources");
    };
    if (not resources.containsKey(id)) {
      Runtime.trap("Resource not found");
    };
    resources.remove(id);
  };
};
