export default {
    module:'cardInfo',
    data:{
        cardNo:'2230344',
        momey:'100 UDS'
    },
    reduce:{
        'CARDINFO':function(redurceData,storeData){
            storeData.cardInfo = redurceData;
            return storeData;
        }
    }
}