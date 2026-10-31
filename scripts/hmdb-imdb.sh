#!/bin/sh
# Feeds IMDb scores to /hmdb from this Mac. IMDb's GraphQL API answers Cloudflare Workers with 429 since mid-October
# 2026, but not a home connection, so the worker saves films without a score and this fills them in.
# launchd runs it every 15 minutes (scripts/dev.cavusoglu.hmdb-imdb.plist). The key is the worker's HMDB_FEED_KEY
# secret, kept in ~/.hmdb-feed-key. Only calls IMDb when a film has no score.
exec /usr/bin/python3 -I - "$(cat ~/.hmdb-feed-key)" <<'EOF'
import json, sys, urllib.request

def call(url, data=None, headers={}):
    body = json.dumps(data).encode() if data else None
    req = urllib.request.Request(url, body, {"content-type": "application/json", "user-agent": "hmdb-imdb", **headers})
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.read()

for f in json.loads(call("https://cavusoglu.dev/api/filmler")):
    if f["imdb"] is not None:
        continue
    try:
        q = '{ title(id: "%s") { ratingsSummary { aggregateRating } } }' % f["id"]
        res = json.loads(call("https://graphql.imdb.com/", {"query": q}, {"x-imdb-client-name": "imdb-web-next-localized"}))
        score = res["data"]["title"]["ratingsSummary"]["aggregateRating"]
        if score:  # null until IMDb has enough votes; tried again next run
            call("https://cavusoglu.dev/api/filmler/imdb", {"id": f["id"], "imdb": score}, {"authorization": "Bearer " + sys.argv[1]})
            print(f["title"], score)
    except Exception as e:
        print(f["title"], "failed:", e, file=sys.stderr)
EOF
