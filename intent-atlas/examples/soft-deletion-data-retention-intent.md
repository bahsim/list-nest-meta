# Soft Deletion and Data Retention Intent (Universal Example)

**Purpose:**
Enable resources to be recoverable after deletion and comply with data retention policies. This intent supports legal compliance, user trust, and operational safety in any system that manages user or business data.

## Universal Flows
- Mark resource as deleted (soft delete)
- Exclude soft-deleted resources from normal queries
- Restore resource from deleted state
- Permanently purge resource after retention period
- Audit log all deletion and restoration actions

## Key Considerations
- **Compliance:** Support for GDPR/CCPA and other regulations.
- **User Experience:** Clear feedback on deletion, ability to undo or restore.
- **Data Integrity:** Prevent orphaned or inconsistent data.
- **Automation:** Scheduled purging, notifications before permanent deletion.
- **Security:** Restrict who can delete, restore, or purge data.

## Template Reference
- Based on: [intent-template-solo-dev.md](../templates/intent-template-solo-dev.md)
- See also: [intent-enriched-format-principle.md](../principles/intent-enriched-format-principle.md)

## How to Adapt
- **For Highly Regulated Domains:** Add legal hold and audit export features.
- **For Multi-Tenant Systems:** Isolate deletion and retention by tenant.
- **For Large Data Volumes:** Use batch or background jobs for purging.
- **For User-Facing Apps:** Provide self-service data export and deletion.

---
This example is intended as a universal pattern. Adapt the flows, retention rules, and compliance features to your domain and regulatory environment. 