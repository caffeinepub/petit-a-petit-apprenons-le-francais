import Array "mo:core/Array";
import Runtime "mo:core/Runtime";

actor {
  type Review = {
    reviewerName : Text;
    grade : Nat;
    reviewText : Text;
    starRating : Nat;
    year : Nat;
  };

  type Achievement = {
    studentName : Text;
    grade : Nat;
    score : Nat;
    year : Nat;
    subject : Text;
  };

  var reviews : [Review] = [
    {
      reviewerName = "Alice";
      grade = 7;
      reviewText = "Great teaching!";
      starRating = 5;
      year = 2023;
    },
    {
      reviewerName = "Bob";
      grade = 8;
      reviewText = "Helped me improve my grades.";
      starRating = 4;
      year = 2023;
    },
    {
      reviewerName = "Charlie";
      grade = 6;
      reviewText = "Very patient tutor.";
      starRating = 5;
      year = 2024;
    },
    {
      reviewerName = "Diana";
      grade = 9;
      reviewText = "Excellent explanations.";
      starRating = 5;
      year = 2024;
    },
    {
      reviewerName = "Eve";
      grade = 10;
      reviewText = "Boosted my confidence in French.";
      starRating = 4;
      year = 2024;
    },
  ];

  var achievements : [Achievement] = [
    {
      studentName = "Frank";
      grade = 6;
      score = 100;
      year = 2023;
      subject = "Final Exam";
    },
    {
      studentName = "Grace";
      grade = 7;
      score = 100;
      year = 2023;
      subject = "Midterm";
    },
    {
      studentName = "Henry";
      grade = 8;
      score = 100;
      year = 2024;
      subject = "Quiz";
    },
    {
      studentName = "Isabel";
      grade = 9;
      score = 100;
      year = 2024;
      subject = "Project";
    },
    {
      studentName = "Jack";
      grade = 10;
      score = 100;
      year = 2024;
      subject = "Final Exam";
    },
    {
      studentName = "Kate";
      grade = 6;
      score = 100;
      year = 2024;
      subject = "Homework";
    },
  ];

  public query ({ caller }) func getReviews() : async [Review] {
    reviews;
  };

  public query ({ caller }) func getAchievements() : async [Achievement] {
    achievements;
  };

  public shared ({ caller }) func addReview(review : Review) : async () {
    if (review.starRating < 1 or review.starRating > 5) {
      Runtime.trap("Star rating must be between 1 and 5");
    };
    reviews := reviews.concat([review]);
  };

  public shared ({ caller }) func addAchievement(achievement : Achievement) : async () {
    if (achievement.score > 100) {
      Runtime.trap("Score cannot exceed 100");
    };
    achievements := achievements.concat([achievement]);
  };
};
