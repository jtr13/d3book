library(tis)
library(tidyverse)
h <- holidays(2000:2030)
df <- data.frame(holiday = names(h), h) %>%
  mutate(date = as.Date(as.character(h), format = "%Y%m%d")) %>%
  filter(holiday == "Thanksgiving")

ggplot(df, aes(tis::year(date), tis::day(date))) +
  geom_line(color="orange", lwd=1.5) +
  geom_point() +
  geom_vline(xintercept = 2019, color = "red") +
  scale_y_continuous(breaks=22:28)
