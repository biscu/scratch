import Image from "next/image";
import ScratchCard from "./component/scratch-card";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4	">
      <ScratchCard
        imageUrl="https://images.unsplash.com/photo-1531956531700-dc0ee0f1f9a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80"
        width={300}
        height={300}
      />
    </div>
  );
}
