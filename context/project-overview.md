# DIY Investor Toolkit — MVP Project Spec

## 1) Product Summary
DIY Investor Toolkit is a multi-user SaaS web application focused on stock analysis, portfolio management, and long-term investing research.

The MVP focuses on:
- Portfolio tracking with manual holdings entry
- Real-time market pricing and dividend tracking
- Individual stock analysis pages
- Personal watchlists
- Clean portfolio performance visualization

The platform should be designed from the beginning to support future expansion into:
- CSV imports
- Broker synchronization
- Alerts and notifications
- Advanced valuation tools
- Portfolio analytics
- International equities support at scale

Primary technology stack:
- Frontend: Next.js
- Backend: Next.js server architecture and APIs
- Database: PostgreSQL
- Authentication: GitHub OAuth2

The MVP should support equities from any country, while treating U.S. equities as the primary default market experience initially.

Fractional shares must be fully supported in the MVP.

---

## 2) Product Goals
1. Help investors quickly understand portfolio performance.
2. Make stock research fast, clean, and actionable.
3. Provide a strong foundation for future investing tools.
4. Create a scalable architecture suitable for a multi-user SaaS product.
5. Minimize vendor lock-in for market data providers.

---

## 3) MVP Scope

### In Scope
- Multi-user SaaS authentication
- GitHub OAuth2 login
- User-owned portfolios
- Manual portfolio holding entry
- Fractional share support
- Watchlist management
- Real-time quote updates
- Portfolio dashboard
- Individual stock analysis pages
- Dividend metrics
- Financial metrics and charting
- Recent stock news
- Support for international equities
- Public/private market data integrations

### Out of Scope for MVP
- CSV imports
- Broker synchronization
- Alerts and notifications
- Shared or collaborative portfolios
- Automated trading
- Mobile apps
- Advanced stock screeners
- Tax reporting
- Rebalancing automation

---

## 4) Core User Roles

### Standard User
A registered user who can:
- Authenticate with GitHub
- Create and manage portfolios
- Track holdings
- Maintain watchlists
- Research stocks

### Admin (Optional Future Role)
Administrative role for:
- Monitoring integrations
- Debugging data issues
- Reviewing system health
- Managing internal operational tooling

---

## 5) Main User Stories
- As a user, I can log in using GitHub.
- As a user, I can manually add stock holdings.
- As a user, I can add fractional shares.
- As a user, I can view portfolio performance in real time.
- As a user, I can see gains and losses relative to my cost basis.
- As a user, I can research individual stocks.
- As a user, I can review dividend information.
- As a user, I can view charts and trend lines.
- As a user, I can maintain a watchlist.
- As a user, I can access recent news for stocks I follow.
- As a user, I can research equities from multiple countries.

---

## 6) MVP Features

### 6.1 Authentication and User Accounts
- GitHub OAuth2 authentication
- Sign up and login using GitHub
- Secure session handling
- User-specific data isolation
- Basic account settings

### 6.2 Portfolio Tracker
The portfolio dashboard should display holdings with:
- Ticker symbol
- Company name
- Exchange
- Current price
- Shares owned
- Fractional shares support
- Average cost basis
- Total cost
- Total market value
- Day change in dollars
- Day change percentage
- Total gain/loss compared to cost basis
- 1-year trend line chart
- Annual dividend per share
- Annual dividend yield
- Dividend 5-year CAGR

Portfolio summary should include:
- Total portfolio value
- Total portfolio cost basis
- Total gain/loss
- Total day change
- Estimated annual dividend income
- Total dividend yield

### 6.3 Stock Analysis Page
Each stock detail page should display:

#### Quote Information
- Current price
- Day range
- 52-week range
- Volume
- Market capitalization

#### Valuation Metrics
- PE ratio
- Forward PE
- Price-to-book
- Price-to-sales
- EV/EBITDA

#### Cash Flow Metrics
- Operating cash flow
- Free cash flow
- Free cash flow growth

#### Margins and Growth
- Revenue growth
- EPS growth
- Gross margin
- Operating margin
- Net margin

#### Balance Sheet Metrics
- Cash
- Debt
- Debt/equity
- Current ratio

#### Dividend Information
- Dividend yield
- Dividend history
- Dividend CAGR
- Payout ratio

#### Additional Features
- Price charting
- Recent company news
- Key company information

### 6.4 Watchlist
- Add stocks manually
- Remove stocks manually
- Display current quote data
- Link directly to stock analysis pages
- Support international equities

### 6.5 Data Refresh Strategy
- Real-time quote updates for visible stocks
- Cached fundamentals data
- Scheduled refresh for slower-changing metrics
- Graceful fallback behavior when providers fail

---

## 7) Future Roadmap

### Near-Term Expansion
- CSV import support
- Broker synchronization
- Alerts and notifications
- Price targets
- Enhanced charting
- Portfolio allocation analysis
- ETF and fund support improvements

### Advanced Investing Tools
- Graham valuation
- Discounted cash flow (DCF)
- Dividend scoring systems
- Quality scoring systems
- Portfolio risk analysis
- Rebalancing suggestions
- Multi-portfolio support
- Scenario analysis

---

## 8) Information Architecture

### Main Pages
- Landing page
- Login/authentication
- Dashboard
- Portfolio page
- Stock analysis page
- Watchlist page
- Settings page
- Help/disclaimer page

### Primary Navigation
- Dashboard
- Portfolio
- Watchlist
- Search
- Settings

---

## 9) Data Model Outline

### User
- id
- github_id
- username
- display_name
- email
- avatar_url
- created_at
- updated_at

### Portfolio
- id
- user_id
- name
- base_currency
- created_at
- updated_at

### Holding
- id
- portfolio_id
- ticker
- exchange
- company_name
- shares_decimal
- average_cost_per_share
- currency
- purchase_date optional
- notes optional
- created_at
- updated_at

### WatchlistItem
- id
- user_id
- ticker
- exchange
- notes optional
- created_at
- updated_at

### QuoteCache
- ticker
- exchange
- current_price
- previous_close
- day_change_dollars
- day_change_percent
- market_cap
- dividend_annual
- dividend_yield_annual
- currency
- updated_at

### FundamentalsSnapshot
- ticker
- exchange
- valuation_metrics_json
- cash_flow_metrics_json
- growth_metrics_json
- margin_metrics_json
- balance_sheet_metrics_json
- dividend_metrics_json
- updated_at

### NewsItem
- ticker
- title
- source
- url
- published_at
- summary optional

---

## 10) API and Integration Expectations
- Use a combination of public and private APIs.
- Support market quotes, fundamentals, charts, and news.
- Keep providers abstracted behind an internal service layer.
- Design adapters so providers can be swapped later.
- Support international equity symbols and exchanges.
- Optimize quote refreshes to feel real-time.
- Use caching where appropriate to reduce provider costs.

---

## 11) Portfolio Calculation Rules

### Portfolio Calculations
- Total cost = shares × average cost per share
- Total market value = shares × current price
- Day change dollars = shares × (current price - previous close)
- Day change percent = ((current price - previous close) / previous close) × 100
- Gain/loss percent = ((current price - average cost) / average cost) × 100
- Annual dividend income = shares × annual dividend per share
- Dividend yield = annual dividend per share / current price × 100

All calculations must support decimal/fractional share precision.

---

## 12) Non-Functional Requirements
- Responsive web-first design
- Secure account isolation
- Fast dashboard performance
- Graceful API failure handling
- Scalable SaaS architecture
- Expandable database design
- Vendor abstraction for data providers
- Strong typing across backend and frontend
- Support for future internationalization

---

## 13) UX Principles
- Make the dashboard immediately understandable.
- Prioritize clarity over information overload.
- Allow fast drill-down into stock details.
- Keep financial metrics visually clean.
- Use compact cards and simple charts.
- Optimize for desktop web usage first.

---

## 14) Technical Architecture Notes

### Frontend
- Next.js App Router
- TypeScript
- Responsive UI

### Backend
- Next.js server actions and API routes
- Service layer for market data integrations
- Background jobs for cache refreshes

### Database
- PostgreSQL
- ORM layer recommended

### Authentication
- GitHub OAuth2

### Infrastructure Considerations
- Cache quote data aggressively
- Use typed provider adapters
- Support horizontal scaling later
- Separate quote data from user portfolio data

---

## 15) Acceptance Criteria for MVP
The MVP is complete when:
- Users can authenticate with GitHub OAuth2
- Users can manually add holdings
- Fractional shares work correctly
- Portfolio calculations are accurate
- Dashboard metrics render correctly
- Watchlists function end-to-end
- Stock detail pages display required financial data
- News and charting load correctly
- Real-time quotes refresh successfully
- Multiple users can safely use isolated accounts
- The application is deployable as a SaaS web app

---

## 16) Remaining Open Questions
1. Which market data providers should power quotes, fundamentals, charts, and news?
2. Should ETFs and mutual funds receive dedicated handling in MVP?
3. Should portfolios support multiple currencies in MVP or later?
4. What level of historical charting should be available initially?
5. Should dividend data allow manual overrides if provider data is incomplete?

---

## 17) Recommended Next Deliverable
Create a coding-agent-ready implementation specification that includes:
- Repository structure
- Database schema
- ORM models
- API contracts
- Service architecture
- Authentication flow
- Page-by-page UI requirements
- State management decisions
- Market data provider abstraction layer
- Deployment architecture
- Milestone-based implementation plan

