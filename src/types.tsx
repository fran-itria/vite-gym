export enum InformationEnum {
    meal,
    exercises,
}

export type PropsNavHealth = {
    information: InformationEnum;
    setInformation: React.Dispatch<React.SetStateAction<InformationEnum>>;
};