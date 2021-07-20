import { Propulsor } from "./propulsor";
export class Coet{
    public _codi: string;
    public _propulsors: Propulsor[];
    public _potenciaInicial: number;
    public _img: number;
    public _acceleracio: number;
    public _deceleracio: number;
    public _curpower: number;
    public _posX: number;
    public _posY: number;
    

/// ejemplo potenPropuls = [10, 20, 30] igual a 3 propulsores de 10, 20 y 30
    constructor(codi:string, potenPropuls:Array<number>, numColor: number){
        this._codi= codi;
        this._propulsors= new Array<Propulsor>();
        this._potenciaInicial= 0;
        this._img= numColor;
        this._acceleracio = 10;
        this._deceleracio= 10;
        this._curpower = 0;
        this._posX = 0;
        this._posY = 0;

        for (let i = 0; i < potenPropuls.length; i++) {
            this._propulsors.push(new Propulsor(i+1, potenPropuls[i]))
        }
    }

    addPropulsor(value: number){
        this._propulsors.push(new Propulsor(this._propulsors.length + 1, value))
    }

    getImage(rocket:string) :string{
        return require('../assets/images/' + rocket + '.png')
    }

    getImageCursa(rocket:string) :string{
        return require('@/assets/images/' + rocket + '.png')
    }

    getMaxPower() :number{
        let power = 0;
        for (let i = 0; i < this._propulsors.length; i++) {
            power = power + this._propulsors[i]._maxpower;
        }
        return power;
    }

    setImage(url:number) {
        this._img = url;
    }

    accelerar() :number{
        const maxPower = this.getMaxPower();
        if(this._curpower < maxPower){
        this._curpower = this._curpower + this._acceleracio;
        }
        return this._curpower;
    }

    frenar() :number{
        if(this._curpower > this._deceleracio){
            this._curpower = this._curpower - this._deceleracio;
            }else{
                this._curpower = 0;
                alert("The power is off")
            }
            return this._curpower;
    }

    veure() :string {
        let textPropusolr = "";
        for (let i = 0; i < this._propulsors.length; i++) {
            textPropusolr = textPropusolr + `
            Propulsor ${this._propulsors[i]._idPropulsor} amb potencia ${this._propulsors[i]._maxpower} 
            `
            
        }
        return `
        El codi del coet es ${this._codi}.
        
        Té ${this._propulsors.length} propulsors:
        ${textPropusolr}.
        Actualment viatge amb ${this._curpower}
        `
    }
}