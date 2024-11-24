import { NotFoundError } from "../../handler/error.response";
import { Board } from "../../orm/entities/Board";
import boardRepository from "./board.repository";
import workspaceRepository from "../workspace/workspace.repository";
import { INewBoard, IUpdateBoard } from "./dto";

class BoardService{

    public async newBoard (newBoardDto: INewBoard): Promise<Board>{
        const workspace = await workspaceRepository.findbyId(newBoardDto.workspaceId)
        if(!workspace){
            throw new NotFoundError('Workspace not found')
        }
        return await boardRepository.insert(newBoardDto, workspace)
    }   

    public async updateBoard(updateBoardDto:IUpdateBoard, boardId:string){
        const board = await boardRepository.findById(boardId)
        if(!board){
            throw new NotFoundError('Board not found')
        }
        return await boardRepository.update(updateBoardDto , boardId)
    }

    public async removeBoard(boardId:string){
        const board = await boardRepository.findById(boardId)
        if(!board){
            throw new NotFoundError('Board not found')
        }
        return await boardRepository.detele(board)
    }

    public async getBoardByWorkspace(workspaceId: string){
        const workspace = await workspaceRepository.findbyId(workspaceId)
        if(!workspace){
            throw new NotFoundError('Workspace not found')
        }
        return await boardRepository.getBoardbyWorkspace(workspaceId)
    }

    public async getBoardById(boardId: string){
        const board = await boardRepository.getBoardDetail(boardId)
        if(!board){
            throw new NotFoundError('Board not found')
        }
        return board
    }
}

export default new BoardService()