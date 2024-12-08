import { Router } from "express";
const BoardRoute:Router = Router()
import { NewBoardValidation,updateBoardValidation } from "./validator";
import BoardController from "./board.controller";
import asyncHandler from "../../middleware/asyncHandle";
import { checkAuth } from "../../middleware/checkAuth";
import validate from "../../middleware/validate";
import { checkPermissionInBoard } from "../../middleware/checkPermission";
import { PermissionEnum } from "../../common/enums/permission";
//CREATE BOARD
BoardRoute.post('/', checkAuth, validate(NewBoardValidation) ,asyncHandler(BoardController.newBoard))
//GET BOARD BY WORKSPACE
BoardRoute.get('/', checkAuth , asyncHandler(BoardController.getBoardByWorkspace))
//GET BOARD BY ID
BoardRoute.get('/:id', asyncHandler(BoardController.getBoardById))
// BoardRoute.get('/:id', 
//     checkAuth,
//     checkPermissionInBoard([PermissionEnum.CanViewBoard]),
//     asyncHandler(BoardController.getBoardById))
//UPDATE BOARD
BoardRoute.put('/:id',asyncHandler(BoardController.updateBoard))
// BoardRoute.put('/:id',
//     checkAuth,
//     checkPermissionInBoard([PermissionEnum.CanEditBoard]),
//     validate(updateBoardValidation),
//     asyncHandler(BoardController.updateBoard))
//REMOVE BOARD
BoardRoute.delete('/:id',
    checkAuth,
    checkPermissionInBoard([PermissionEnum.CanEditBoard]),
    asyncHandler(BoardController.removeBoard))
//INVITE MEMBER
BoardRoute.post('/:id/member/add',
    checkAuth,
    checkPermissionInBoard([PermissionEnum.CanManageBoardMember]),
    asyncHandler(BoardController.inviteMember))
//REMOVE MEMBER
BoardRoute.delete('/:id/member/remove',
    checkAuth,
    checkPermissionInBoard([PermissionEnum.CanManageBoardMember]),
    asyncHandler(BoardController.removeMember))
//CHACNGE ROLE
BoardRoute.put('/:id/member/change-role',
    checkAuth,
    checkPermissionInBoard([PermissionEnum.CanManageBoardMember]),
    asyncHandler(BoardController.changeRole))

export default BoardRoute