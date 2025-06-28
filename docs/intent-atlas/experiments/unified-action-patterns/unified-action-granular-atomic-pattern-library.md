# Unified Action Granular Atomic Pattern Library

## run_cli_command
**Purpose:** Execute a CLI command to scaffold, build, or configure the project.
**Typical Outputs:** Command output, new files/folders, updated project state.
**Key Parameters:** Command string, working directory.

## create_folder
**Purpose:** Create a new folder in the project structure.
**Typical Outputs:** New directory at specified path.
**Key Parameters:** Folder path.

## create_file_from_template
**Purpose:** Generate a file from a predefined template with optional variable substitution.
**Typical Outputs:** New file at specified path with template content.
**Key Parameters:** File path, template, variables.

## write_text_file
**Purpose:** Write or overwrite a text file with provided content.
**Typical Outputs:** File at specified path with given content.
**Key Parameters:** File path, content.

## edit_json_file
**Purpose:** Add, update, or remove fields in a JSON file (e.g., `package.json`, `tsconfig.json`).
**Typical Outputs:** Updated JSON file.
**Key Parameters:** File path, JSON path, value to set/remove.

## add_script_to_package_json
**Purpose:** Add or update a script in `package.json`.
**Typical Outputs:** Updated `package.json` with new/modified script.
**Key Parameters:** Script name, command.

## install_npm_package
**Purpose:** Install one or more npm packages as dependencies or devDependencies.
**Typical Outputs:** Updated `package.json`, `node_modules/`.
**Key Parameters:** Package name(s), version(s), dev flag.

## add_env_variable
**Purpose:** Add or update an environment variable in `.env` or `.env.example`.
**Typical Outputs:** Updated env file with new/modified variable.
**Key Parameters:** Variable name, value, file path.

## add_gitignore_rule
**Purpose:** Add a rule to `.gitignore` to exclude files/folders from version control.
**Typical Outputs:** Updated `.gitignore` file.
**Key Parameters:** Rule string.

## initialize_git_repo
**Purpose:** Initialize a new Git repository in the project root.
**Typical Outputs:** `.git` folder.
**Key Parameters:** None.

## add_class_validator_decorator
**Purpose:** Add a class-validator decorator to a DTO property for input validation.
**Typical Outputs:** Updated DTO file with decorator (e.g., `@IsEmail()`).
**Key Parameters:** DTO file, property, decorator type, options.

## add_openapi_decorator
**Purpose:** Add an OpenAPI/Swagger decorator to a controller or DTO for documentation.
**Typical Outputs:** Updated file with decorator (e.g., `@ApiProperty()`).
**Key Parameters:** Target file, property/method, decorator type, options.

## write_unit_test
**Purpose:** Write a unit test for a function, class, or method.
**Typical Outputs:** Test file or test case in appropriate location.
**Key Parameters:** Target file/function, test case description, assertions.

## write_e2e_test
**Purpose:** Write an end-to-end test for an API endpoint or user flow.
**Typical Outputs:** Test file in `test/e2e/` or similar.
**Key Parameters:** Endpoint, scenario, expected result.

## add_folder_to_tsconfig_paths
**Purpose:** Add a folder alias to the `paths` section of `tsconfig.json`.
**Typical Outputs:** Updated `tsconfig.json` with new path alias.
**Key Parameters:** Alias, folder path.

## add_import_statement
**Purpose:** Add an import statement to a TypeScript file.
**Typical Outputs:** Updated file with new import at the top.
**Key Parameters:** File path, import statement.

## add_export_statement
**Purpose:** Add an export statement to a TypeScript file.
**Typical Outputs:** Updated file with new export.
**Key Parameters:** File path, export statement.

## add_property_to_class
**Purpose:** Add a property to a class definition in a TypeScript file.
**Typical Outputs:** Updated class with new property.
**Key Parameters:** File path, class name, property name, type, decorators.

## add_method_to_class
**Purpose:** Add a method to a class definition in a TypeScript file.
**Typical Outputs:** Updated class with new method.
**Key Parameters:** File path, class name, method name, parameters, body.

## add_route_to_controller
**Purpose:** Add a route handler method to a NestJS controller.
**Typical Outputs:** Updated controller file with new route method.
**Key Parameters:** Controller file, HTTP method, route path, handler code.

## add_guard_to_route
**Purpose:** Add a guard to a route handler in a NestJS controller.
**Typical Outputs:** Updated controller file with guard decorator.
**Key Parameters:** Controller file, route method, guard class.

## add_dto_file
**Purpose:** Create a new DTO file for request/response validation.
**Typical Outputs:** DTO file in appropriate folder.
**Key Parameters:** File path, DTO class name, properties, decorators.

## add_enum_file
**Purpose:** Create a new enum file for roles, permissions, or other constants.
**Typical Outputs:** Enum file in appropriate folder.
**Key Parameters:** File path, enum name, values.

## add_seed_data
**Purpose:** Add seed data to a database seed script.
**Typical Outputs:** Updated seed script with new data.
**Key Parameters:** Entity, data object.

## add_health_indicator
**Purpose:** Add a health indicator for a dependency (DB, cache, etc) to a health check module.
**Typical Outputs:** Updated health module with new indicator.
**Key Parameters:** Dependency type, check logic.

## add_cron_job
**Purpose:** Add a scheduled (cron) job to a batch processing module.
**Typical Outputs:** Updated batch module with new job handler.
**Key Parameters:** Schedule, job logic.

## add_deleted_at_field
**Purpose:** Add a `deletedAt` field to an entity for soft deletion.
**Typical Outputs:** Updated entity/model file.
**Key Parameters:** Entity file, field type.

## add_recovery_method
**Purpose:** Add a method to recover soft-deleted records in a service.
**Typical Outputs:** Updated service file with recovery method.
**Key Parameters:** Service file, method name, logic.

## add_cleanup_script
**Purpose:** Add a script to permanently delete old soft-deleted records.
**Typical Outputs:** Cleanup script file.
**Key Parameters:** Script file, retention policy.

## add_swagger_config
**Purpose:** Add Swagger/OpenAPI configuration to expose API docs.
**Typical Outputs:** Swagger config file, docs endpoint.
**Key Parameters:** Config file, endpoint path.

## add_versioning_script
**Purpose:** Add a script to version static API docs or changelogs.
**Typical Outputs:** Versioning script file.
**Key Parameters:** Script file, versioning strategy.

## add_dockerfile
**Purpose:** Add a Dockerfile for containerized builds.
**Typical Outputs:** Dockerfile in project root.
**Key Parameters:** Base image, build steps.

## add_docker_compose_file
**Purpose:** Add a docker-compose.yml for multi-service orchestration.
**Typical Outputs:** docker-compose.yml in project root.
**Key Parameters:** Services, ports, env.

## add_ci_pipeline_config
**Purpose:** Add a CI pipeline config file for build, test, and deploy.
**Typical Outputs:** CI config file (e.g., .github/workflows/ci.yml).
**Key Parameters:** CI provider, steps.

## add_secret_to_config
**Purpose:** Add a secret to a secrets management config or script.
**Typical Outputs:** Updated secrets config/script.
**Key Parameters:** Secret name, value, provider.

## write_markdown_doc
**Purpose:** Write a Markdown documentation file for any process or config.
**Typical Outputs:** Markdown file in docs folder.
**Key Parameters:** File path, content. 