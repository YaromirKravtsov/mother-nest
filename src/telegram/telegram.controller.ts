import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { SearchRealEstateInGroupsDto } from './dto/searchRealEstateInGroups.dto';

@Controller('telegram')
export class TelegramController {
    constructor(private telegramService:  TelegramService){}
    
    @Get('/search-in-groups-real-estate')
    searchRealEstateInGroups(@Query() dto:SearchRealEstateInGroupsDto ){
        try {
            const result = this.telegramService.searchRealEstateInGroups(dto);
            return result;
        } catch (error) {
            console.log(error);
            throw new HttpException('Error occurred while searching messages',HttpStatus.BAD_REQUEST);
        }
    }
}
