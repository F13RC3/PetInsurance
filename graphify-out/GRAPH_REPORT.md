# Graph Report - /home/kei0s/Documents/PetInsurance  (2026-05-07)

## Corpus Check
- Corpus is ~5,489 words - fits in a single context window. You may not need a graph.

## Summary
- 83 nodes · 100 edges · 14 communities detected
- Extraction: 82% EXTRACTED · 18% INFERRED · 0% AMBIGUOUS · INFERRED: 18 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_User Authentication|User Authentication]]
- [[_COMMUNITY_Policies Service Core|Policies Service Core]]
- [[_COMMUNITY_System Architecture|System Architecture]]
- [[_COMMUNITY_Claims Service|Claims Service]]
- [[_COMMUNITY_Policy Models & Schemas|Policy Models & Schemas]]
- [[_COMMUNITY_Frontend-Backend Integration|Frontend-Backend Integration]]
- [[_COMMUNITY_Database Helpers|Database Helpers]]
- [[_COMMUNITY_ESLint Configuration|ESLint Configuration]]
- [[_COMMUNITY_Project Overview|Project Overview]]
- [[_COMMUNITY_Architecture Overview|Architecture Overview]]
- [[_COMMUNITY_Phase 1 Planning|Phase 1 Planning]]
- [[_COMMUNITY_Phase 2 Planning|Phase 2 Planning]]
- [[_COMMUNITY_Phase 3 Planning|Phase 3 Planning]]
- [[_COMMUNITY_Phase 4 Planning|Phase 4 Planning]]

## God Nodes (most connected - your core abstractions)
1. `Policy` - 7 edges
2. `create_claim()` - 7 edges
3. `create_policy()` - 6 edges
4. `Claim` - 6 edges
5. `Users Service FastAPI Application` - 5 edges
6. `UserBase` - 4 edges
7. `generate_quote()` - 4 edges
8. `PolicyBase` - 4 edges
9. `Policy` - 4 edges
10. `QuoteRequest` - 4 edges

## Surprising Connections (you probably didn't know these)
- `create_policy()` --follows_up_on--> `Get a Quote Feature`  [INFERRED]
  services/policies-service/main.py → docs/user_guide.md
- `create_claim()` --provides_data_for--> `Submit a Claim Feature`  [EXTRACTED]
  services/claims-service/main.py → docs/user_guide.md
- `generate_quote()` --provides_data_for--> `Get a Quote Feature`  [EXTRACTED]
  services/policies-service/main.py → docs/user_guide.md
- `create_policy()` --semantically_similar_to--> `create_claim()`  [INFERRED] [semantically similar]
  services/policies-service/main.py → services/claims-service/main.py
- `Policy` --semantically_similar_to--> `Claim`  [INFERRED] [semantically similar]
  services/policies-service/models.py → services/claims-service/models.py

## Hyperedges (group relationships)
- **User Authentication Flow** — main_py, auth_py, models_py, schemas_py, database_py [EXTRACTED 0.95]
- **Frontend-Backend API Integration** — appjsx, main_py [INFERRED 0.85]
- **React Application Stack** — appjsx, mainjsx, index_html, vite_configjs [EXTRACTED 0.90]
- **Pet Insurance Microservices Stack** — system_architecture_api_gateway, system_architecture_users_service, system_architecture_policies_service, system_architecture_claims_service, system_architecture_postgresql [EXTRACTED 1.00]
- **Policies Service Components** — policies_service_main_create_policy, policies_service_main_get_policies, policies_service_main_get_policy, policies_service_main_generate_quote, policies_service_models_policy, policies_service_schemas_policy [EXTRACTED 1.00]
- **Claims Service Components** — claims_service_main_create_claim, claims_service_main_get_claims, claims_service_models_claim, claims_service_schemas_claim [EXTRACTED 1.00]

## Communities

### Community 0 - "User Authentication"
Cohesion: 0.17
Nodes (9): create_access_token(), get_password_hash(), verify_password(), login_for_access_token(), register(), Config, User, UserBase (+1 more)

### Community 1 - "Policies Service Core"
Cohesion: 0.22
Nodes (8): Base, health_check(), create_policy(), get_policies(), get_policy(), health_check(), Policy, User

### Community 2 - "System Architecture"
Cohesion: 0.22
Nodes (11): Claims Service API, Policies Service API, Users Service API, API Gateway (Nginx), Claims Service, Frontend Application, Policies Service, PostgreSQL Database (+3 more)

### Community 3 - "Claims Service"
Cohesion: 0.31
Nodes (7): create_claim(), get_claims(), Claim, Claim, ClaimBase, ClaimCreate, Config

### Community 4 - "Policy Models & Schemas"
Cohesion: 0.36
Nodes (8): BaseModel, generate_quote(), Config, Policy, PolicyBase, PolicyCreate, QuoteRequest, QuoteResponse

### Community 5 - "Frontend-Backend Integration"
Cohesion: 0.31
Nodes (9): Main React Application Component, JWT and Password Authentication, SQLAlchemy Database Setup, HTML Entry Point, Users Service FastAPI Application, React Entry Point, User SQLAlchemy Model, Pydantic User Schemas (+1 more)

### Community 6 - "Database Helpers"
Cohesion: 0.5
Nodes (2): get_db(), get_db()

### Community 12 - "ESLint Configuration"
Cohesion: 1.0
Nodes (1): ESLint Configuration

### Community 13 - "Project Overview"
Cohesion: 1.0
Nodes (1): Pet Insurance Microservices

### Community 14 - "Architecture Overview"
Cohesion: 1.0
Nodes (1): Microservices Architecture

### Community 15 - "Phase 1 Planning"
Cohesion: 1.0
Nodes (1): Phase 1: Foundation and Scaffolding

### Community 16 - "Phase 2 Planning"
Cohesion: 1.0
Nodes (1): Phase 2: Database and Persistence

### Community 17 - "Phase 3 Planning"
Cohesion: 1.0
Nodes (1): Phase 3: Core Business Logic and Integration

### Community 18 - "Phase 4 Planning"
Cohesion: 1.0
Nodes (1): Phase 4: Production Readiness

## Knowledge Gaps
- **14 isolated node(s):** `Config`, `Config`, `Config`, `ESLint Configuration`, `Vite Configuration` (+9 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Database Helpers`** (4 nodes): `get_db()`, `get_db()`, `database.py`, `database.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ESLint Configuration`** (1 nodes): `ESLint Configuration`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Project Overview`** (1 nodes): `Pet Insurance Microservices`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Architecture Overview`** (1 nodes): `Microservices Architecture`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Phase 1 Planning`** (1 nodes): `Phase 1: Foundation and Scaffolding`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Phase 2 Planning`** (1 nodes): `Phase 2: Database and Persistence`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Phase 3 Planning`** (1 nodes): `Phase 3: Core Business Logic and Integration`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Phase 4 Planning`** (1 nodes): `Phase 4: Production Readiness`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `UserBase` connect `User Authentication` to `Policy Models & Schemas`?**
  _High betweenness centrality (0.174) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Policy` (e.g. with `Policy` and `Claim`) actually correct?**
  _`Policy` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `create_claim()` (e.g. with `Claim` and `create_policy()`) actually correct?**
  _`create_claim()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `create_policy()` (e.g. with `Policy` and `Get a Quote Feature`) actually correct?**
  _`create_policy()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Claim` (e.g. with `Claim` and `Policy`) actually correct?**
  _`Claim` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Config`, `Config`, `Config` to the rest of the system?**
  _14 weakly-connected nodes found - possible documentation gaps or missing edges._