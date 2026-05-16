"use client";

import { Callout } from "@/components/docs/callout";

export function CalloutGalleryDemo({ caption }: { caption?: string }) {
  return (
    <figure className="my-8 not-prose">
      <div className="space-y-3">
        <Callout variant="tip" title="Tip">
          Anchor every agent to a folder. Agents that own a folder write predictable
          things in predictable places.
        </Callout>
        <Callout variant="info" title="Note">
          The dev server picks up content changes automatically. Restart only when
          you change a React component or the build script.
        </Callout>
        <Callout variant="warning" title="Heads up">
          Skills can include scripts. Cabinet defends with an allow-list and an
          install-time scan, but a skill always runs as you. Treat external skills
          like external code.
        </Callout>
        <Callout variant="danger" title="Important">
          Don&apos;t run <code>cabinetai uninstall</code> if you can&apos;t back up
          your <code>$CABINET_DATA_DIR</code>. The cached app is fine to remove; your
          cabinet folders are your data.
        </Callout>
      </div>
      {caption && (
        <p className="mt-3 text-center text-xs text-muted-foreground">{caption}</p>
      )}
    </figure>
  );
}
