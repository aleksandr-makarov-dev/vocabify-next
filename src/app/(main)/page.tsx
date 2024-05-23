import Header from "@/components/common/Header";

export default function Home() {
  return (
    <div className="space-y-5">
      <Header title="What is Vocabify?" />
      <p>
        A language learing project built using Nextjs, Next Auth and MongoDb
      </p>
      <div>
        <h5 className="text-lg font-medium mb-1.5">Features</h5>
        <ul className="pl-3 list-disc list-inside">
          <li>HTML file parsing</li>
          <li>Test generation</li>
          <li>Store data in the database</li>
          <li>Users</li>
        </ul>
      </div>
      <div>
        <h5 className="text-lg font-medium mb-1.5">Requirements</h5>
        <ul className="pl-3 list-disc list-inside">
          <li>
            Minimum number of terms to create test -{" "}
            <span className="font-bold">4</span>
          </li>
        </ul>
      </div>
      <div>
        <h5 className="text-lg font-medium mb-1.5">Instructions</h5>
        <ul className="pl-3 list-disc list-inside">
          <li>
            Download page as <span className="font-bold">HTML</span> and upload
            it to import form. After file is parsed click on create button.
          </li>
          <li>
            <span className="font-bold">Space</span> - flip card,{" "}
          </li>
          <li>
            <span className="font-bold">Arrow Right</span> - next card,{" "}
          </li>
          <li>
            <span className="font-bold">Arrow Left</span> - previous card{" "}
          </li>
          <li>
            <span className="font-bold">A</span> - play audio{" "}
          </li>
          <li>
            <span className="font-bold">Enter</span> - submit answer / next
            question{" "}
          </li>
          <li>
            <span className="font-bold">Arrow Right (Test)</span> - skip
            question{" "}
          </li>
        </ul>
      </div>
    </div>
  );
}
