import { Button } from "@/components/ui/button";
import { FolderSearch, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";

const SetsEmptyView: FC = () => {
  const navigate = useRouter();

  return (
    <div className="flex flex-col items-center py-10 text-center">
      <FolderSearch className="w-16 h-16" />
      <div className="mb-5 mt-2">
        <p className="text-lg font-medium">No sets found</p>
        <p className="text-gray-700">Get started by creating a new set.</p>
      </div>
      <Button asChild>
        <Link href="/create">Create new</Link>
      </Button>
    </div>
  );
};

export default SetsEmptyView;
