import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, Loader2, Upload } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ExternalBlob, FileType } from "../backend";
import type { Resource } from "../backend.d";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const FILE_TYPE_ICONS: Record<FileType, string> = {
  [FileType.doc]: "📄",
  [FileType.pdf]: "📋",
  [FileType.video]: "🎬",
  [FileType.image]: "🖼️",
};

const FILE_TYPE_LABELS: Record<FileType, string> = {
  [FileType.doc]: "Document",
  [FileType.pdf]: "PDF",
  [FileType.video]: "Video",
  [FileType.image]: "Image",
};

const SKELETON_KEYS = ["sk-0", "sk-1", "sk-2", "sk-3", "sk-4", "sk-5"];

function ResourceCard({
  resource,
  index,
}: { resource: Resource; index: number }) {
  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    setDownloading(true);
    try {
      const url = resource.blob.getDirectURL();
      const a = document.createElement("a");
      a.href = url;
      a.download = resource.title;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="bg-white rounded-2xl p-6 border border-border shadow-md hover:shadow-navy transition-all duration-300 hover:-translate-y-1 flex flex-col gap-3"
      data-ocid={`resources.item.${index + 1}`}
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl leading-none flex-shrink-0 mt-0.5">
          {FILE_TYPE_ICONS[resource.fileType]}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-foreground text-base leading-snug truncate">
            {resource.title}
          </h3>
          <span className="inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
            {FILE_TYPE_LABELS[resource.fileType]}
          </span>
        </div>
      </div>

      {resource.description && (
        <p className="text-foreground/60 text-sm leading-relaxed line-clamp-2">
          {resource.description}
        </p>
      )}

      <div className="mt-auto pt-1">
        <Button
          size="sm"
          variant="outline"
          onClick={handleDownload}
          disabled={downloading}
          className="w-full rounded-xl gap-2"
          data-ocid={`resources.download.button.${index + 1}`}
        >
          {downloading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {downloading ? "Opening..." : "View / Download"}
        </Button>
      </div>
    </motion.div>
  );
}

function UploadForm({ onUploaded }: { onUploaded: () => void }) {
  const { actor } = useActor();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileType, setFileType] = useState<FileType>(FileType.pdf);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!actor || !file) return;
    setUploading(true);
    setError("");
    setProgress(0);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) =>
        setProgress(Math.round(pct)),
      );
      await actor.uploadResource(
        title.trim(),
        description.trim(),
        blob,
        fileType,
      );
      onUploaded();
      setTitle("");
      setDescription("");
      setFile(null);
      setFileType(FileType.pdf);
      if (fileRef.current) fileRef.current.value = "";
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-14 max-w-2xl mx-auto bg-white rounded-2xl border border-border shadow-md p-8"
    >
      <div className="flex items-center gap-2 mb-1">
        <Upload className="w-5 h-5 text-gold" />
        <h3 className="font-display text-xl font-bold text-foreground">
          Upload a Resource
        </h3>
      </div>
      <p className="text-foreground/55 text-sm mb-6">
        Add grammar notes, worksheets, PDFs, images or videos for your students.
      </p>

      <form onSubmit={handleUpload} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="res-title"
              className="text-sm font-medium text-foreground/80 mb-1.5 block"
            >
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="res-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Subjunctive Worksheet"
              required
              className="rounded-xl"
              data-ocid="resources.input"
            />
          </div>
          <div>
            <Label
              htmlFor="res-type"
              className="text-sm font-medium text-foreground/80 mb-1.5 block"
            >
              File Type
            </Label>
            <select
              id="res-type"
              value={fileType}
              onChange={(e) => setFileType(e.target.value as FileType)}
              className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="resources.select"
            >
              <option value={FileType.pdf}>📋 PDF</option>
              <option value={FileType.doc}>📄 Document</option>
              <option value={FileType.image}>🖼️ Image</option>
              <option value={FileType.video}>🎬 Video</option>
            </select>
          </div>
        </div>

        <div>
          <Label
            htmlFor="res-desc"
            className="text-sm font-medium text-foreground/80 mb-1.5 block"
          >
            Description
          </Label>
          <Textarea
            id="res-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of what this resource covers..."
            rows={2}
            className="rounded-xl resize-none"
            data-ocid="resources.textarea"
          />
        </div>

        <div>
          <Label
            htmlFor="res-file"
            className="text-sm font-medium text-foreground/80 mb-1.5 block"
          >
            File <span className="text-destructive">*</span>
          </Label>
          <input
            ref={fileRef}
            id="res-file"
            type="file"
            required
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="block w-full text-sm text-foreground/70 file:mr-3 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-secondary-foreground hover:file:brightness-110 cursor-pointer"
            data-ocid="resources.upload_button"
          />
        </div>

        {uploading && progress > 0 && (
          <div className="w-full bg-border rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {error && (
          <p
            className="text-destructive text-sm"
            data-ocid="resources.error_state"
          >
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={uploading || !title.trim() || !file}
          className="w-full rounded-xl"
          data-ocid="resources.submit_button"
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading{progress > 0 ? ` ${progress}%` : "..."}
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" /> Upload Resource
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
}

export default function ResourcesSection() {
  const { actor, isFetching } = useActor();
  const { login, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: resources, isLoading } = useQuery<Resource[]>({
    queryKey: ["resources"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getResources();
    },
    enabled: !!actor && !isFetching,
  });

  useEffect(() => {
    if (!actor) return;
    actor
      .isCallerAdmin()
      .then(setIsAdmin)
      .catch(() => setIsAdmin(false));
  }, [actor]);

  function handleUploaded() {
    queryClient.invalidateQueries({ queryKey: ["resources"] });
  }

  const list = resources ?? [];
  const isLoggingIn = loginStatus === "logging-in";

  return (
    <section id="resources" className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-gold text-sm font-semibold tracking-[0.25em] uppercase mb-3">
            ⚜ Study Materials
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Student
            <span className="text-gold italic"> Resources</span>
          </h2>
          <p className="mt-4 text-foreground/60 max-w-xl mx-auto">
            Grammar notes, worksheets, and study materials curated by your
            teacher to help you excel in French.
          </p>
        </motion.div>

        {/* Admin Upload Panel */}
        {isAdmin && <UploadForm onUploaded={handleUploaded} />}

        {/* Admin Login Area */}
        {!isAdmin && !actor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-10 text-center"
          >
            <p className="text-foreground/50 text-sm mb-3">
              Are you the teacher?{" "}
              <button
                type="button"
                onClick={login}
                disabled={isLoggingIn}
                className="text-primary font-semibold hover:underline disabled:opacity-50"
                data-ocid="resources.button"
              >
                {isLoggingIn ? "Logging in..." : "Log in as Admin"}
              </button>
            </p>
          </motion.div>
        )}

        {/* Resource Grid */}
        {isLoading || isFetching ? (
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="resources.loading_state"
          >
            {SKELETON_KEYS.map((k) => (
              <div
                key={k}
                className="bg-white rounded-2xl p-6 border border-border"
              >
                <Skeleton className="h-10 w-10 rounded-lg mb-4" />
                <Skeleton className="h-5 w-40 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        ) : list.length === 0 ? (
          <div
            className="text-center py-16 text-foreground/40"
            data-ocid="resources.empty_state"
          >
            <div className="text-6xl mb-4">📚</div>
            <p className="font-display text-xl text-foreground/50">
              No resources yet
            </p>
            <p className="text-sm mt-2">
              Check back soon — your teacher will upload materials here.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((resource, i) => (
              <ResourceCard
                key={`${resource.title}-${i}`}
                resource={resource}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
