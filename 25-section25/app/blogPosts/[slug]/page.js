export default function blog({ params }) {
  return (
    <main>
      <h1>blog number : {params.slug}</h1>
    </main>
  );
}
