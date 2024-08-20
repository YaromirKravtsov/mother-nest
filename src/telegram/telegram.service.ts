import { Injectable } from '@nestjs/common';
import { SearchRealEstateInGroupsDto } from './dto/searchRealEstateInGroups.dto';
import chatIds from './constants/chatIds';
import { TelegramClientService } from 'src/telegram-client/telegram-client.service';

@Injectable()
export class TelegramService {

    constructor(private readonly telegramClientService: TelegramClientService) {}


    async searchRealEstateInGroups(dto:SearchRealEstateInGroupsDto){
        try {
            const client = this.telegramClientService.getClient();
            let allMessages = []; 
         
            for (const chatId of chatIds) {
                const chat = await client.getEntity(chatId);
                const messages = await client.getMessages(chat, { limit: 100 });
                allMessages = allMessages.concat(messages); 
            }
            console.log(allMessages)
    
    
            const foundMessages = allMessages.filter(msg => {
                if (msg.message) {
                    const hasBed = msg.message.includes(dto.bed + " bed");
                    const hasRegion = msg.message.includes(dto.region);
               
                    const numbers = msg.message.match(/\d+/g);
                    const inPriceRange = numbers && numbers.some(num => {
                        const priceValue = parseInt(num, 10);
                        return priceValue >= dto.minPrice && priceValue <= dto.maxPrice;
                    });
        
                    return hasBed && hasRegion && inPriceRange;
                }
                return false;
            });
        
    
            return {
                count: foundMessages.length,
                messages: foundMessages.map(msg => msg.message)
            };
        } catch (e) {
            console.log(e)
        }
    
    }
}
