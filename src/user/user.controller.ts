import { Body, Controller, Delete, Get, Param, Post,Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}
    @Get()
    async getAllUsers():Promise<User[]> {
        return this.userService.getAllUsers();
    }
    @Get(':id')
    async getUserById(@Param('id') id:number):Promise<User>{
        return this.userService.getUserById(id);
    }
    
    
    @Post()
    async createUser(@Body() userData:Partial<User>): Promise<User>{
        return this.userService.createUser(userData);
    }
    @Put(':id')
    async updatedUser(@Param('id') id:number,@Body() updatedDatta:Partial<User>):Promise<User>{
        return this.userService.updatedUser(id,updatedDatta);
    }
    @Delete(':id')
    async deleteUser(@Param('id') id:number):Promise<{message:string}>{
        return this.userService.deleteUser(id);
    }
    
}
