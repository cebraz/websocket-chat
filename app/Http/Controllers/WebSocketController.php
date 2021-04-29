<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;
use SplObjectStorage;

class WebSocketController extends Controller implements MessageComponentInterface
{
    public $clients;

    public function __construct()
    {
        $this->clients = new SplObjectStorage;
        echo "conexao websocket";
    }

    public function onOpen(ConnectionInterface $conn)
    {
        $this->clients->attach($conn);
        echo "Usuário conectado: {{$conn->resourceId}}\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        echo "Erro: {$e->getMessage()}\n";
        $conn->close();
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        $carbon = Carbon::now(-3);
        
        foreach ($this->clients as $client) {
            $client->send(json_encode([
                'date' => $carbon->toTimeString(),
                'msg' => $msg,
                'from' => $from->resourceId
            ]));
        }
    }

    public function onClose(ConnectionInterface $conn)
    {
        $this->clients->detach($conn);
    }
}