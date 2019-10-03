import dash
from dash.dependencies import Output, Input
import dash_core_components as dcc
import dash_html_components as html
import plotly
import random
import plotly.graph_objs as go
import csv
from collections import deque
import pandas as pd
from scipy.signal import savgol_filter

X = deque(maxlen=20)
X.append(1)
Y = deque(maxlen=20)
Y.append(1)


app = dash.Dash(__name__)
app.layout = html.Div(
    [
        dcc.Graph(id='live-graph', animate=True),
        dcc.Interval(
            id='graph-update',
            interval=1000,
            n_intervals=0
        ),
    ]
)

@app.callback(Output('live-graph', 'figure'),
              [Input('graph-update', 'n_intervals')])


def update_graph_scatter(n):
    df = pd.read_json("http://localhost:500/", typ='series')
    X.append(df.timestamp)
    print(X)
    Y.append(df.average)
    print(Y)

    # if max(X) > 200:
    #     min_x_value = max(X) - 200
    # else:
    #     min_x_value = min(X)

    data = plotly.graph_objs.Scatter(
            x=list(X),
            y=list(savgol_filter(Y, 19, 7)),
            name='Scatter',
            mode= 'lines+markers'
            )

    return {'data': [data],'layout' : go.Layout(title= "Dynamic Engagement Tracker", xaxis=dict(range=[max(X)- 10,max(X)],
                                                            title = 'Time'),
                                                yaxis = dict(range=[0,5],
                                                            title = 'Engagement'))}



if __name__ == '__main__':
    app.run_server(debug=False)