import mongoose,{Schema,Document} from "mongoose";

interface IPrayerTiming{
    azan:string;
    jamat:string;
    start:string;
    end:string
}

export interface IPrayerTime extends Document{
    islamicDate:string;
    temperature:number;
    sehriTime:string;
    iftarTime:string;
    prayers:{
        Fajr:IPrayerTiming
        Dhuhr: IPrayerTiming;
        Asr: IPrayerTiming;
        Maghrib: IPrayerTiming;
        Isha: IPrayerTiming;
        Jumma:IPrayerTime
    };
}

const PrayerTimeSchema = new Schema<IPrayerTime>({
    islamicDate:{type:String,required:true},
    temperature: { type: Number, required: true },
    sehriTime: { type: String, required: true },
    iftarTime: { type: String, required: true },
    prayers: {
        Fajr: {
          azan: { type: String, required: true },
          jamat: { type: String, required: true },
          start: { type: String, required: true },
          end: { type: String, required: true },
        },
        Dhuhr: {
          azan: { type: String, required: true },
          jamat: { type: String, required: true },
          start: { type: String, required: true },
          end: { type: String, required: true },
        },
        Asr: {
          azan: { type: String, required: true },
          jamat: { type: String, required: true },
          start: { type: String, required: true },
          end: { type: String, required: true },
        },
        Maghrib: {
          azan: { type: String, required: true },
          jamat: { type: String, required: true },
          start: { type: String, required: true },
          end: { type: String, required: true },
        },
        Isha: {
          azan: { type: String, required: true },
          jamat: { type: String, required: true },
          start: { type: String, required: true },
          end: { type: String, required: true },
        },
        Jumma: {
            azan: { type: String, required: true },
            jamat: { type: String, required: true },
            start: { type: String, required: true },
            end: { type: String, required: true },
          },
      },
})

export default mongoose.models.PrayerTime || mongoose.model<IPrayerTime>("PrayerTime",PrayerTimeSchema)