import Link from "next/link";
export default function blogPosts() {
  return (
    <main>
      <h1>Your blog posts</h1>
      <div>
        <Link href="/blogPosts/p1">post 1</Link>
      </div>
      <div>
        <Link href="/blogPosts/p2">post 2</Link>
      </div>
    </main>
  );
}
