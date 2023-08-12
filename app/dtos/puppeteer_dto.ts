import { IsEmail, IsNotEmpty, IsString } from "class-validator";

class Puppeteer_dto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  private mail: string;

  @IsNotEmpty()
  @IsString()
  private password: string;
}

export default Puppeteer_dto;
