import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from 'argon2';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) { }

  // Création d'un utilisateur
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await argon2.hash(
      createUserDto.password);
    const isAdmin = createUserDto.is_admin ? true : false;
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      is_admin: isAdmin,
    });
    return newUser.save();
  }

  // Récupération de tous les utilisateurs
  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().sort({ id: 1 }).exec();
  }

  // Récupération d'un utilisateur par ID
  async findUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Récupération de tous les admin par  is_admin=true
  async getAdminUsers(): Promise<User[]> {
    const administrators = this.userModel.find({ is_admin: true }).exec();
    return administrators;
  }

  // Récupération d'un utilisateur par email et mise à jour pour le nommer admin
  async makeAdminByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    user.is_admin = true;
    return user.save();
  }

  // Récupération d'un utilisateur par email et mise à jour pour le nommer admin
  async makeNotAdminByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    user.is_admin = false;
    return user.save();
  }

  // Mise à jour d'un utilisateur
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await argon2.hash(
        updateUserDto.password);
    }
    const updatedUser = await this.userModel
      .findByIdAndUpdate({ _id: id }, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with ID #${id} not found`);
    }
    return updatedUser;
  }

  // Suppression d'un utilisateur
  async deleteUser(id: string): Promise<void> {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
  //Total utilisateurs inscrit sur le site
  async getTotalUsers(): Promise<number> {
    return this.userModel.countDocuments().exec();
  }
}
