import Link from "next/link";
import Header from "@/components/Header";
export default function Home() {
  return (
    <main>
      <Header />
      <p>🔥 Let&apos;s get started! 🔥</p>
      <Link href="/about">
        <p>about us</p>
      </Link>
      <Link href="/blogPosts">
        <p>blogs</p>
      </Link>
    </main>
  );
}
