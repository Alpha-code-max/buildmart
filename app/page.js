import NameForm from "@/components/NameForm";

export default function HomePage() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-5/6 max-w-xl">
        <NameForm />
      </div>
    </div>
  );
}
