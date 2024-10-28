import { NotFoundError } from "../../handler/error.response";
import { Board } from "../../orm/entities/Board";
import { Workspace } from "../../orm/entities/Workspace";
import boardRepository from "./board.repository";
import workspaceRepository from "../workspaces/workspace.repository";
import { INewBoard, IUpdateBoard } from "./dto";

class BoardService{

    public async newBoard (newBoardDto: INewBoard , workspaceId: number): Promise<Board>{
        const workspace = await workspaceRepository.findWorkspaceById(workspaceId)
        if(!workspace){
            throw new NotFoundError('Workspace not found')
        }
        return await boardRepository.newBoard(newBoardDto, workspace)
    }   

    public async updateBoard(updateBoardDto:IUpdateBoard, boardId:number){
        const board = await boardRepository.findBoardById(boardId)
        if(!board){
            throw new NotFoundError('Board not found')
        }
        return await boardRepository.updateBoard(updateBoardDto , boardId)
    }

    public async removeBoard(boardId:number){
        const board = await boardRepository.findBoardById(boardId)
        if(!board){
            throw new NotFoundError('Board not found')
        }
        return await boardRepository.removeBoard(board)
    }

    public async getBoardByWorkspace(workspaceId: number){
        const workspace = await workspaceRepository.findWorkspaceById(workspaceId)
        if(!workspace){
            throw new NotFoundError('Workspace not found')
        }
        
    }
}

export default new BoardService()