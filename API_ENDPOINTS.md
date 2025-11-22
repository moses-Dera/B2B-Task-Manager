# 🚀 TaskFlow API Endpoints

**Base URL:** `https://task-manger-backend-z2yz.onrender.com/api`

---

## 🔐 Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Register new user | ❌ |
| POST | `/login` | User login | ❌ |
| GET | `/me` | Get current user | ✅ |
| POST | `/forgot-password` | Request password reset | ❌ |
| POST | `/reset-password` | Reset password with token | ❌ |

### Examples:
```bash
# Register
POST https://task-manger-backend-z2yz.onrender.com/api/auth/signup

# Login
POST https://task-manger-backend-z2yz.onrender.com/api/auth/login

# Get current user
GET https://task-manger-backend-z2yz.onrender.com/api/auth/me
Authorization: Bearer <token>
```

---

## 👤 Users (`/api/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/profile` | Get user profile | ✅ |
| PUT | `/profile` | Update user profile | ✅ |

### Examples:
```bash
# Get profile
GET https://task-manger-backend-z2yz.onrender.com/api/users/profile
Authorization: Bearer <token>

# Update profile
PUT https://task-manger-backend-z2yz.onrender.com/api/users/profile
Authorization: Bearer <token>
```

---

## 📋 Tasks (`/api/tasks`)

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| GET | `/` | Get tasks with filters | ✅ | All |
| POST | `/` | Create task | ✅ | Admin, Manager |
| GET | `/:id` | Get single task | ✅ | All |
| PUT | `/:id` | Update task | ✅ | All |
| POST | `/:id/files` | Upload file to task | ✅ | All |
| GET | `/:id/files` | Get task files | ✅ | All |

### Examples:
```bash
# Get tasks with filters
GET https://task-manger-backend-z2yz.onrender.com/api/tasks?status=pending&tab=today
Authorization: Bearer <token>

# Create task
POST https://task-manger-backend-z2yz.onrender.com/api/tasks
Authorization: Bearer <token>

# Get single task
GET https://task-manger-backend-z2yz.onrender.com/api/tasks/64f8a1b2c3d4e5f6a7b8c9d0
Authorization: Bearer <token>
```

---

## 👥 Team (`/api/team`)

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| GET | `/employees` | Get employee list | ✅ | Admin, Manager |
| GET | `/performance` | Get team performance metrics | ✅ | Admin, Manager |
| POST | `/assign-task` | Assign task to employee | ✅ | Admin, Manager |

### Examples:
```bash
# Get employees
GET https://task-manger-backend-z2yz.onrender.com/api/team/employees
Authorization: Bearer <token>

# Get performance metrics
GET https://task-manger-backend-z2yz.onrender.com/api/team/performance
Authorization: Bearer <token>
```

---

## 💬 Chat (`/api/chat`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/messages` | Get messages | ✅ |
| POST | `/messages` | Send message | ✅ |

### Examples:
```bash
# Get messages
GET https://task-manger-backend-z2yz.onrender.com/api/chat/messages
Authorization: Bearer <token>

# Send message
POST https://task-manger-backend-z2yz.onrender.com/api/chat/messages
Authorization: Bearer <token>
```

---

## 🔔 Notifications (`/api/notifications`)

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| GET | `/` | Get user notifications | ✅ | All |
| PUT | `/:id/read` | Mark notification as read | ✅ | All |
| POST | `/` | Create system notification | ✅ | Admin |

### Examples:
```bash
# Get notifications
GET https://task-manger-backend-z2yz.onrender.com/api/notifications
Authorization: Bearer <token>

# Mark as read
PUT https://task-manger-backend-z2yz.onrender.com/api/notifications/64f8a1b2c3d4e5f6a7b8c9d0/read
Authorization: Bearer <token>
```

---

## 🔑 Authentication Header

All protected endpoints require:
```
Authorization: Bearer <jwt-token>
```

## 📱 Frontend Integration

The frontend automatically handles authentication and API calls through:
- `src/utils/api.js` - API helper functions
- Base URL: `https://task-manger-backend-z2yz.onrender.com/api`

---

## 🌐 Live URLs

- **Frontend**: https://b2-b-task-manager.vercel.app
- **Backend**: https://task-manger-backend-z2yz.onrender.com
- **API Base**: https://task-manger-backend-z2yz.onrender.com/api