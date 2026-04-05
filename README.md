# 🚀 Invento – Product Management Dashboard

A modern **Product Management Dashboard** built with **Next.js, React.js, and Tailwind CSS** that allows users to **add, view, edit, and delete products**.
This project demonstrates a **client-side CRUD application** with modular components, responsive design, and persistent data using **Local Storage**.

The project was developed as part of a **Full Stack Intern Assessment** to showcase practical skills in **modern frontend development, UI design, and state management**.

---

# 📌 Project Overview

Managing product information is a core feature in many business systems.
This dashboard focuses on delivering a **clean, simple, and intuitive interface** for managing product data.

Users can:

* Add new products with relevant details
* View products in a structured layout
* Edit product information
* Delete products with confirmation
* Store product data persistently using **Local Storage**

The project emphasizes **component-based architecture**, **clean UI design**, and **modern React development practices**.

---

# ✨ Key Features

* 📦 **Product CRUD Operations**
  Create, read, update, and delete products easily.

* 💾 **Local Storage Data Persistence**
  Product data remains saved even after refreshing the browser.

* 🧩 **Modular Component Architecture**
  Built with reusable React components.

* 🎨 **Modern UI Design**
  Styled using Tailwind CSS and shadcn/ui components.

* 🌙 **Dark / Light Mode Support**
  Users can toggle between dark and light themes.

* 🔔 **Toast Notifications**
  Displays success or error messages for user actions.

* 📱 **Responsive Layout**
  Works smoothly across desktop and mobile devices.

---

# 🛠️ Tech Stack

### Frontend

* **Next.js (App Router)**
* **React.js**

### Styling

* **Tailwind CSS**

### UI Components

* **shadcn/ui**

### Icons

* **Lucide React**

### State Management

* **React Hooks (useState, useEffect)**

### Storage

* **Browser Local Storage**

---

# 📂 Project Structure

```
project-root/
├─ public/Logos
├─ src/
│   ├─ app/
│   │   ├─ home/page.jsx          # Main route for Product Manager dashboard
│   │   ├─ ProductManager.jsx     # Product management page
│   │   ├─ layout.js              # App layout, includes theme provider
│   │   ├─ page.jsx               # Landing page (Welcome.jsx)
│   │   └─ global.css             # Tailwind and custom styles
│
│   ├─ components/
│   │   ├─ ActionBtn.jsx          # Reusable buttons for actions
│   │   ├─ Loader.jsx             # Loading spinner
│   │   ├─ ProductionForm.jsx     # Form to add/edit products
│   │   ├─ ProductionList.jsx     # Display list/grid of products
│   │   ├─ ProductManager.jsx     # Main wrapper
│   │   ├─ productViewModel.jsx   # View modal
│   │   ├─ statCard.jsx           # Dashboard stats cards
│   │   ├─ theme-provider.jsx     # Theme context provider
│   │   ├─ theme-toggle.jsx       # Dark/light mode toggle
│   │   └─ WelcomePage.jsx        # Landing UI
│
│   └─ utils/
│       └─ localStorage.js        # CRUD operations
```
---

# ⚙️ Installation & Setup

Follow these steps to run the project on your local machine.

### 1️⃣ Install Prerequisites

Make sure the following tools are installed:

* **Node.js**
* **npm**
* **Git (optional)**

Check installation:

```
node -v
npm -v
```

---

### 2️⃣ Clone the Repository

```
git clone https://github.com/SanthushEk/Invento.git
```

---

### 3️⃣ Navigate to Project Folder

```
cd Invento-main
```

---

### 4️⃣ Install Dependencies

```
npm install
```
---

### 5️⃣ Run the Development Server

```
npm run dev
```

---

### 6️⃣ Open the Application

Open your browser and go to:

```
http://localhost:3000
```

The **Invento Product Management Dashboard** will now run locally.

---

# 🧪 Example Product Fields

Each product can include:

* Product Name
* Price
* Description
* Image URL (optional)

---

# 🎯 Learning Outcomes

This project demonstrates practical knowledge in:

* React component architecture
* Next.js project structure
* CRUD operations
* Local Storage data persistence
* UI design with Tailwind CSS
* Modal handling and form validation
* Building responsive web applications

---

# 🔮 Possible Future Improvements

Some improvements that could be added in the future:

* Backend integration with **Node.js / Express**
* Database support (MySQL / MongoDB)
* Product categories
* Search and filtering
* Pagination
* Authentication system
* Image upload support

---


# 📄 License

This project is created for **educational and assessment purposes**.

---

# 👨‍💻 Author

**SanthushEk**

Full Stack Developer | React | Next.js | UI Development | Cloud Engineer | DevOps

---

⭐ If you found this project useful, consider **starring the repository on GitHub**.
