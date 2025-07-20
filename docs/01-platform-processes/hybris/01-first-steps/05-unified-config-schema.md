# Unified Configuration Schema for Hybris B2C Workspace

This schema is designed to drive code generation and validation for new features, entities, and integrations, based on your extension structure and configuration patterns. It is suitable for YAML or JSON and can be adapted as needed.

---

## YAML Example

```yaml
hybrisProject:
  extensions:
    - name: pearsonb2c
      package: com.pearson.b2c.pearsonb2c
      type: storefront
      features:
        - name: ProductAvailability
          entities:
            - Product
            - Program
          integrations:
            - name: Solr
              type: search
            - name: ExternalAPI
              type: fulfillment
        - name: SavedCart
          entities:
            - Cart
            - Customer
          integrations:
            - name: PaymentGateway
              type: payment
    - name: pearsonbase
      package: com.pearson.b2c.pearsonbase
      type: core
      features: []
    # ...other extensions

  environments:
    - name: local
      db:
        url: jdbc:mysql://localhost/hybris_b2c
        username: hybris
        password: nimda
      websites:
        - code: learner
          publicName: learner.local.pearson.com
          storefront: pearsonb2cstorefront
        # ...other sites

  integrations:
    - name: Solr
      config:
        host: solr.local
        port: 8983
        enabled: true
    - name: PaymentGateway
      config:
        provider: Stripe
        apiKey: ${STRIPE_API_KEY}
        enabled: true

  codegen:
    conventions:
      entityNaming: PascalCase
      extensionNaming: kebab-case
      packageStructure: com.pearson.b2c.<extension>
    validation:
      requiredEntities: [Product, Cart, Customer]
      requiredIntegrations: [Solr, PaymentGateway]
```

---

## Key Concepts

- **extensions**: List of all Hybris extensions, their package, type, features, entities, and integrations.
- **environments**: Database and site configuration for each environment (local, dev, prod, etc.).
- **integrations**: Centralized integration config (search, payment, external APIs).
- **codegen**: Naming conventions and validation rules for code generation and feature validation.

---

## Usage Notes

- Use this schema as a single source of truth for automation, scaffolding, and validation.
- Extend it for more granular control (e.g., per-feature config, additional environments, or integration details).
- Adapt to JSON as needed for your toolchain.
- Enables automation for scaffolding new features, validating required entities/integrations, and enforcing standards across extensions.

If you want a JSON version, more detail for a specific section, or a template file created in your workspace, let me know! 