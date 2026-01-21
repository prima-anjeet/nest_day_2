import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}
    //fetch all users
    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    } 
    //create a new user
    async createUser(userData: Partial<User>): Promise<User>{
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }
    //fetch user by id
    async getUserById(id:number):Promise<User>{
        const user=await this.userRepository.findOneBy({id});
        if(!user){
            throw new NotFoundException(`User not found`);
        }
        return user;
    }
    //update user 
    async updatedUser(id:number, userData:Partial<User>):Promise<User>{
        const user=await this.getUserById(id);
        const updatedUser = Object.assign(user, userData);
        return this.userRepository.save(updatedUser);
    }
  //delete user
  async deleteUser(id:number):Promise<{message:string}>{
    const result=await this.userRepository.delete(id);
    if(result.affected===0){
        throw new NotFoundException(`User not found`);
    }
     return { message: 'User deleted successfully' };
  }
}
