#!/bin/bash

echo "🔧 Fixing Next.js version to stable v14..."
echo ""

npm install next@14.2.5 react@^18.3.1 react-dom@^18.3.1 @types/react@^18.3.3 @types/react-dom@^18.3.0

echo ""
echo "✅ Done! Now run: npm run dev"
echo ""
