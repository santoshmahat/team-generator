export type Player = {
    id?: number
    name: string;
    skill: number;
};

export type Team = {
    id?: number
    name: string;
};

export type Event = {
    id?: number
    title: string;
}

  
  export type TeamGroup = {
    team: string;
    players: Player[];
  };
  
  export type GeneratedTeams= {
    title: string;
    slug: string;
    teams: TeamGroup[];
    url: string;
  }