---
title: "Cabinet File Format"
created: "2026-05-03T00:00:00.000Z"
modified: "2026-05-03T00:00:00.000Z"
status: draft
tags:
  - concepts
  - file-format
order: 12
---

# Cabinet File Format

A cabinet is a folder with a small manifest and regular files.

```text
my-cabinet/
  .cabinet
  index.md
  .agents/
  .jobs/
  notes/
    index.md
```

The `.cabinet` manifest names the cabinet and tells Cabinet whether the folder is a root cabinet or a child cabinet.

```yaml
schemaVersion: 1
id: my-cabinet
name: My Cabinet
kind: root
version: 0.1.0
entry: index.md
```

Everything important remains inspectable on disk.
