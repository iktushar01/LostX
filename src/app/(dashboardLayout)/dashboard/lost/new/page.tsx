import { PageHeader } from "@/components/shared/PageHeader";
import { LostItemForm } from "@/components/lost-items/LostItemForm";

export default function NewLostItemPage() {
  return (
    <div className="mx-auto space-y-8">
      <PageHeader/>
      {/* Grid container to place the form on the left and the image on the right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <LostItemForm />
        </div>
        <div className="hidden md:block">
          <img 
            src="/path-to-your-image.png" 
            alt="Lost item illustration" 
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}