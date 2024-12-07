import { Body, Controller, Post, UseGuards, Request } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Role } from "../../common/constants/role.constant";
import { Public } from "../../common/decorators";
import { AuthService } from "./auth.service";
import { CreateUserDto, LoginDto } from "./dto/user.dto";
import { swagger } from "../../common/constants/swagger.constant";
import { AuthGuard } from "@nestjs/passport";

@ApiTags(swagger.USER_AUTH)
@Controller("user/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("register")
  @ApiOperation({ summary: "Register a new User" }) // Describes what the endpoint does
  @ApiResponse({
    status: 201,
    description: "The User has been successfully created.",
  })
  @ApiResponse({
    status: 400,
    description: "Bad request. Validation failed.",
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register({ ...createUserDto, role: Role.USER });
  }

  @Public()
  @UseGuards(AuthGuard("local-user"))
  @ApiResponse({
    description: "The user has logged in successfully.",
    status: 201,
  })
  @ApiBody({
    type: LoginDto,
  })
  @ApiOperation({ summary: "Login" })
  @Post("login")
  async login(@Request() req: Express.Request) {
    return this.authService.login(req.user);
  }
}
