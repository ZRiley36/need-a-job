import ChessBoard from "../Games Folder/Chess";
export function Games() {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-4">Here are some of my favorite games.</p>
      <ChessBoard />
    </div>
  );
}
