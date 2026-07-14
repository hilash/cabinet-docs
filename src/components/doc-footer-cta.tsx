import { Download, Github, MessageCircle } from "lucide-react";

const DISCORD_URL = "https://discord.gg/hJa5TRTbTH";
const GITHUB_STARS_URL = "https://github.com/cabinetai/cabinet/stargazers";
const DOWNLOAD_URL = "https://github.com/cabinetai/cabinet/releases/latest";

export function DocFooterCta() {
  return (
    <section className="mt-12 border-t border-border pt-6">
      <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 text-card-foreground sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold">Ready to try Cabinet?</h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
            Download Cabinet, star the project, or join Discord when you want help building your own local AI team.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Download className="h-4 w-4" />
            Download Cabinet
          </a>
          <a
            href={GITHUB_STARS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Github className="h-4 w-4" />
            Star on GitHub
          </a>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <MessageCircle className="h-4 w-4 text-[#5865F2]" />
            Discord help
          </a>
        </div>
      </div>
    </section>
  );
}
