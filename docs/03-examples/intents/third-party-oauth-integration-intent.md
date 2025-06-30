# Third-Party OAuth Integration Intent (Universal Example)

**Purpose:**
Allow users to sign in or link their account using third-party identity providers (e.g., Google, Facebook, GitHub). This intent reduces friction, leverages existing identities, and increases trust and convenience.

## Universal Flows
- Initiate OAuth flow from login or settings
- Redirect to provider for authentication/consent
- Handle callback and exchange code for token
- Link or create local user account
- Handle errors, cancellations, and edge cases
- Allow unlinking or managing connected accounts

## Key Considerations
- **Security:** Validate tokens, prevent CSRF, use secure redirect URIs.
- **User Experience:** Clear feedback, fallback to password login, error handling.
- **Privacy:** Request only necessary scopes, inform users about data usage.
- **Compliance:** Store and handle tokens securely, support account deletion.
- **Extensibility:** Support multiple providers, easy to add new ones.

## Template Reference
- Based on: [intent-template-solo-dev.md](../../templates/intent-template-solo-dev.md)
- See also: [ai-role-and-detailing-principle.md](../../principles/ai-role-and-detailing-principle.md)

## How to Adapt
- **For Enterprise:** Add SSO/SAML support.
- **For Mobile:** Use in-app browser or native SDKs.
- **For Multi-Account:** Allow linking multiple providers per user.
- **For Open Source:** Support self-hosted or custom OAuth providers.

---
This example is intended as a universal pattern. Adapt the providers, flows, and security to your platform and user needs. 