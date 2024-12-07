import { Body, Controller, Post, UseGuards, Request } from "@nestjs/common";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Role } from "../../common/constants/role.constant";
import { Public } from "../../common/decorators";
import { AuthService } from "./auth.service";
import { CreateAdminDto, LoginDto } from "./dto/admin.dto";
import { swagger } from "../../common/constants/swagger.constant";
import { AuthGuard } from "@nestjs/passport";

@ApiTags(swagger.ADMIN_AUTH)
@Controller("admin/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("register")
  @ApiOperation({ summary: "Register a new Admin" }) // Describes what the endpoint does
  @ApiResponse({
    status: 201,
    description: "The admin has been successfully created.",
  })
  @ApiResponse({
    status: 400,
    description: "Bad request. Validation failed.",
  })
  async register(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.register({ ...createAdminDto, role: Role.ADMIN });
  }

  @Public()
  @UseGuards(AuthGuard("local-admin"))
  @ApiResponse({
    description: "The admin has logged in successfully.",
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
