# Project Rules & Standards

1. **TypeScript Only**: No `.js` or `.jsx` files. Define interfaces for props.
2. **Component Structure**:
   - One component per file.
   - Named exports preferred over default exports for easier refactoring.
3. **Commit Messages**:
   - Use conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`.
4. **State Management**:
   - Keep it simple. Use `useState` and local state mostly.
   - Lift state up only when necessary.
5. **No Broken Windows**: Fix warnings in the console immediately.
6. **Mobile Verification**: Always check the view in Mobile mode (DevTools) before finishing a task.
