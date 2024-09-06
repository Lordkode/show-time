import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Render,
  Redirect,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Render('users/index') // Affiche la liste des utilisateurs
  async showAllUsers() {
    const users = await this.usersService.findAllUsers();
    return { users };
  }

  @Get('/dash')
  @Render('admin/index')
  async getDashboard() {
    const totalUsers = await this.usersService.getTotalUsers();
    const users = await this.usersService.findAllUsers();
    const totaladministrators = await this.usersService.getAdminUsers();
    return { totalUsers, users, totaladministrators };
  }

  @Get('create')
  @Render('users/create') // Affiche le formulaire de création d'un utilisateur
  createUserForm() {
    return {};
  }

  @Get(':id')
  @Render('users/profiles') // Affiche les détails d'un utilisateur
  async showUserDetail(@Param('id') id: string) {
    const user = await this.usersService.findUserById(id);
    return { user };
  }

  // Route pour nommer un utilisateur admin en utilisant son email
  @Post('make-admin')
  @Redirect('/users/dash')
  async makeAdmin(@Body('email') email: string) {
    const user = await this.usersService.makeAdminByEmail(email);
    return { message: `User with email ${email} is now an admin`, user };
  }

  // Route pour renommer un admin en utilisateur simple en utilisant son email
  @Post('make-notadmin')
  async RetirerAdmin(@Body('email') email: string) {
    const user = await this.usersService.makeNotAdminByEmail(email);
    return { message: `User with email ${email} is now an user`, user };
  }

  // Route pour d'un admin pour creer un utilisateur
  @Post()
  @Redirect('/users/dash')
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.usersService.createUser(createUserDto);
  }

  @Get('edit/:id')
  @Render('users/update') // Affiche le formulaire de mise à jour d'un utilisateur
  async editUserForm(@Param('id') id: string) {
    const user = await this.usersService.findUserById(id);
    return { user };
  }

  @Post('/update/:id')
  @Redirect('/users/dash') // Redirige vers la liste des utilisateurs après la mise à jour
  async updateUser(
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDto,
  ) {
    await this.usersService.updateUser(id, createUserDto);
  }

  @Post('/delete/:id')
  @Redirect('/users/dash') // Redirige vers la liste des utilisateurs après la suppression
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
  }
}
