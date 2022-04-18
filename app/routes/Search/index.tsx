import styled from '@emotion/styled'
import { Box, Card, CardContent, CardMedia, Tooltip, Typography } from '@mui/material';
import type { LoaderFunction } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";

import { searchHeroData } from "~/models/marvel.server";
import type { IHero } from "~/types/global";

const Btn = styled.button`
  padding: 10px;
  margin-top: 10px;
  background-color: #23306d;
  border: 0.1rem solid black;
  color: white;
  &:hover {
    box-shadow: 3px 3px 0 black;
  }
`


export const loader: LoaderFunction = async ({
    request,
}) => {
    const url = new URL(request.url);
    const heroName = url.searchParams.get("heroName");


    if (heroName && heroName.length) {
        const heroData = await searchHeroData(heroName)
        return heroData
    }

    throw new Error("Hero not found")
}


export function ErrorBoundary({ error }: { error: Error }) {
    console.error({ error });
    return (
        <div>
            {error.message}
        </div>
    );
}

export default function Index() {
    const heroesData = useLoaderData<IHero[]>();

    return (
        <div>
            {heroesData &&
                heroesData.map((hero) => (
                    <Card sx={{ display: 'flex', border: "0.2rem solid", margin: '1rem', padding: '1rem' }} key={hero.id}>
                        <CardMedia
                            component="img"
                            sx={{ width: 151, height: 151 }}
                            image={hero.thumbnail.path + "." + hero.thumbnail.extension}
                            alt="Live from space album cover"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography noWrap gutterBottom variant="h5" component="div">
                                    {hero.name}
                                </Typography>
                                <Tooltip title={hero.description}>
                                    <Typography variant="body2" color="text.secondary">
                                        {hero.description || "No description provided"}
                                    </Typography>
                                </Tooltip>
                                <NavLink to={`${hero.id}`} end>
                                    <Btn>See details</Btn>
                                </NavLink>
                            </CardContent>
                        </Box>

                    </Card>
                ))
            }
        </div>
    )
}