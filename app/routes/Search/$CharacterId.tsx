import styled from '@emotion/styled'
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useNavigate } from "react-router-dom";

import { getComicsData, getHeroData } from "~/models/marvel.server";
import type { IComic, IHero } from "~/types/global";

const HeroDataContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2rem;
    padding: 2rem;
    border: 1px solid black;
`

const HeroDescriptionContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
`

export const loader: LoaderFunction = async ({
    params,
}) => {
    const characterId = params.CharacterId

    if (characterId && characterId.length) {
        const heroData = await getHeroData(characterId)
        const comicsData = await getComicsData(characterId)

        return { heroData, comicsData }
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
    let navigate = useNavigate();

    const { heroData, comicsData } = useLoaderData<{ heroData: IHero, comicsData: IComic[] }>();


    return (
        <HeroDataContainer>
            <div>
                <Button onClick={() => navigate(-1)}>
                    Go Back
                </Button>
            </div>
            <HeroDescriptionContainer>
                <div>
                    <Typography variant="h1" component="h2">
                        {heroData.name}
                    </Typography>
                    <Typography variant="h5" component="h5">
                        {heroData.description}
                    </Typography>
                </div>
                <div>
                    <CardMedia
                        component="img"
                        sx={{ width: 300, height: 300 }}
                        image={heroData.thumbnail.path + "." + heroData.thumbnail.extension}
                        alt="Live from space album cover"
                    />
                </div>
            </HeroDescriptionContainer>
            <Typography variant="h1" component="h2">
                Comics
            </Typography>
            <Grid container spacing={2}>
                {comicsData && comicsData.map((comic) => (
                    <Grid item xs={3} key={comic.id}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 350, height: 300 }}
                                image={comic.thumbnail.path + "." + comic.thumbnail.extension}
                                alt={comic.title}
                            />
                            <CardContent>
                                <Typography gutterBottom noWrap variant="h5" component="div">
                                    {comic.title}
                                </Typography>
                            </CardContent>

                        </Card>
                    </Grid>
                ))}
                {comicsData && comicsData.length === 0 && (
                    <Typography variant="h5" component="h5">
                        No comics found
                    </Typography>
                )}
            </Grid>
        </HeroDataContainer>
    )
}