import ChessBoard from "../Games Folder/Chess";
import Snake from "../Games Folder/Snake";
import Tetris from "@/app/components/Games Folder/Tetris";
export function Games() {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-4">Here are some of my favorite games.</p>
      <ChessBoard />
      <Snake></Snake>
      <Tetris></Tetris>
    </div>
  );
}
