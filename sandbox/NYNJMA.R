library(tidyverse)
df <- read_csv("sandbox/nynjma.csv")
df <- df |> group_by(state) |> mutate(cases = cases - lag(cases))
df <- df |> pivot_wider(id_cols = date, names_from = state, values_from = cases)
#write_csv(df, "data/nynjma_wide_na.csv")
df <- df[complete.cases(df),]
write_csv(df, "data/nynjma_wide.csv")
