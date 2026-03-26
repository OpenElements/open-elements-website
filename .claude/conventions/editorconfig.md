# EditorConfig Conventions for Claude Code

## Overview

Every repository should include a `.editorconfig` file at the root to enforce consistent formatting across all editors and IDEs. EditorConfig is supported natively by IntelliJ IDEA, VS Code, and most other editors.

See [editorconfig.org](https://editorconfig.org/) for the specification.

## Standard `.editorconfig`

The following configuration is the Open Elements standard. It is based on conventions from Google, JetBrains, Angular, and the broader Java/TypeScript community.

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 4
trim_trailing_whitespace = true
insert_final_newline = true

[*.java]
max_line_length = 120
ij_java_class_count_to_use_import_on_demand = 9999
ij_java_names_count_to_use_import_on_demand = 9999
ij_java_use_single_class_imports = true
ij_java_layout_static_imports_separately = true
ij_java_block_brace_style = end_of_line
ij_java_class_brace_style = end_of_line
ij_java_method_brace_style = end_of_line
ij_java_lambda_brace_style = end_of_line
ij_java_if_brace_force = always
ij_java_for_brace_force = always
ij_java_while_brace_force = always
ij_java_do_while_brace_force = always

[*.{ts,tsx,js,jsx,json,css,scss,html}]
indent_size = 2

[*.{yml,yaml}]
indent_size = 2

[*.md]
trim_trailing_whitespace = false

[*.xml]
indent_size = 4

[{Dockerfile,Dockerfile.*}]
indent_style = space
indent_size = 4
```

## Key Decisions

- **4 spaces for Java and XML** — industry standard for Maven-based projects.
- **2 spaces for TypeScript/JavaScript, YAML, and JSON** — matches the React/Next.js/Angular ecosystem.
- **LF line endings** — consistent across macOS, Linux, and CI environments.
- **No wildcard imports in Java** — enforced via IntelliJ `ij_java_` properties (threshold set to 9999).
- **Braces always required** for `if`, `for`, `while`, `do-while` in Java — prevents single-line body bugs.
- **Markdown exempt from trailing whitespace trimming** — trailing spaces are significant in Markdown (line breaks).

## Usage

Copy the `.editorconfig` content above into the root of your repository. It will be picked up automatically by supported editors.
