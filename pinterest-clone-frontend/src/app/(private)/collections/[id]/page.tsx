import { notFound } from "next/navigation";
import CollectionView from "@/components/layout/CollectionView";

interface CollectionPageProps {
  params: {
    id: string;
  };
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const collectionId = parseInt(params.id);

  if (isNaN(collectionId)) {
    notFound();
  }

  return <CollectionView collectionId={collectionId} />;
}
