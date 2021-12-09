<?php


class LvApi
{
    private $token;
    private $method;
    private $domain;

    /**
     * @var bool
     */
    private $isAdminApi;

    public function __construct($lvApiDomain, $lvApiToken, $isAdminApi = true, $lvApiMethod = null)
    {
        $this->domain = $lvApiDomain;
        $this->method = $lvApiMethod;
        $this->token = $lvApiToken;

        $this->isAdminApi = $isAdminApi;
    }

    public function sendRequest(array $postFields = [], array $getFields = null)
    {
        $ch = curl_init();
        $getLine = '';
        if (!empty($getFields)) {
            foreach ($getFields as $field => $value) {
                $getLine .= "&$field=$value";
            }
        }
        curl_setopt_array($ch, [
            CURLOPT_URL => $this->getApiUrl() . $getLine,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => (!empty($postFields)) ? true : false,
            CURLOPT_HTTPHEADER => [
                'Content-Type' => 'application/x-www-form-urlencoded'
            ],
            CURLOPT_POSTFIELDS => (!empty($postFields)) ? http_build_query($postFields) : null
        ]);
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }

    private function getApiUrl()
    {
        if ($this->isAdminApi) {
            $apiAccessLevel = 'admin/';
        } else {
            $apiAccessLevel = 'webmaster/v2/';
        }
        return "https://{$this->domain}.leadvertex.ru/api/{$apiAccessLevel}{$this->getMethod()}.html?token={$this->token}";
    }

    /**
     * @return string
     */
    public function getMethod()
    {
        return $this->method;
    }

    /**
     * @param string $method
     */
    public function setMethod($method)
    {
        $this->method = $method;
    }
}