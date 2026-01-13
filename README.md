# The Chronicles of Clean Code 📖

An interactive storybook experience that teaches clean code principles through engaging narratives and code examples. This web application presents software engineering best practices in a unique, book-flipping interface.

> **Original Blog Post**: [How to Write Readable Code](https://dev.to/suckup_de/how-to-write-readable-code-2a0k)

## Features

- 📖 Interactive flip-book interface with smooth page transitions
- 📱 Responsive design (desktop and mobile)
- 🎨 Beautiful typography and visual design
- 💡 Interactive code examples demonstrating clean code principles
- 🔄 Chapter navigation with table of contents
- ⌨️ Keyboard navigation support

## Run Locally

**Prerequisites:** Node.js (v16 or higher)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/voku/ChroniclesCleanCode.git
   cd ChroniclesCleanCode
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## Build for Production

Build the application for deployment:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

This project is configured for deployment to GitHub Pages. The site is automatically deployed when changes are pushed to the main branch.

**Live Demo**: [https://voku.github.io/ChroniclesCleanCode/](https://voku.github.io/ChroniclesCleanCode/)

## Project Structure

```
ChroniclesCleanCode/
├── components/          # React components
│   ├── BookPage.tsx    # Individual page component
│   ├── CodeBlock.tsx   # Code example display
│   ├── Overlay.tsx     # Interactive overlays
│   └── TableOfContents.tsx
├── App.tsx             # Main application component
├── data.ts             # Chapter content and interactions
├── types.ts            # TypeScript type definitions
├── index.tsx           # Application entry point
├── index.html          # HTML template
└── vite.config.ts      # Vite configuration

```

## Technology Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **react-pageflip** - Book flipping functionality
- **Lucide React** - Icons

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Repository**: [https://github.com/voku/ChroniclesCleanCode](https://github.com/voku/ChroniclesCleanCode)

## Key Files Detector

When working with this codebase, here are the most important files to understand:

### Core Application Files
- **`App.tsx`** - Main application component containing the book interface logic, page navigation, and responsive behavior
- **`data.ts`** - All chapter content, code examples, and interactive elements data
- **`types.ts`** - TypeScript interfaces and types used throughout the application

### Component Files
- **`components/BookPage.tsx`** - Renders individual book pages with content and interactive elements
- **`components/CodeBlock.tsx`** - Displays code examples with syntax highlighting
- **`components/Overlay.tsx`** - Shows detailed information when users interact with code examples
- **`components/TableOfContents.tsx`** - Navigation menu for jumping between chapters

### Configuration Files
- **`vite.config.ts`** - Vite build configuration and GitHub Pages setup
- **`index.html`** - HTML entry point with Tailwind CSS and font configurations
- **`package.json`** - Project dependencies and scripts

### Entry Point
- **`index.tsx`** - Application bootstrap and React DOM rendering

## License

This project is open source and available under the MIT License.

## Credits

Created by [@voku](https://github.com/voku) | Original concept from [dev.to blog post](https://dev.to/suckup_de/how-to-write-readable-code-2a0k)
